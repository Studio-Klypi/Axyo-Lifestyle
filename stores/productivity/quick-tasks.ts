import { toast } from "vue-sonner";
import type { QuickTasksState } from "~/types/miscellaneous/states";
import type { IQuickTask } from "~/types/productivity/quick-tasks";

export const useQuickTasksStore = defineStore("quick-tasks", {
  state: (): QuickTasksState => ({
    tasks: [],
    search: "",
    loading: {
      creating: false,
      deleting: false,
      recovering: false,
    },
  }),
  getters: {
    groupedByPeriod: (state): {
      today: IQuickTask[];
      yesterday: IQuickTask[];
      thisWeek: IQuickTask[];
      thisMonth: IQuickTask[];
      older: IQuickTask[];
    } => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay());

      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      const filtered = state.tasks.filter(task => task.label.replaceAll(" ", "").toLowerCase().includes(state.search.toLowerCase().replaceAll(" ", "")));
      return (state.search?.trim().length >= 3 ? filtered : state.tasks).reduce((acc, task) => {
        const taskDate = new Date(task.createdAt);
        taskDate.setHours(0, 0, 0, 0);

        if (taskDate.getTime() === today.getTime())
          acc.today = [...acc.today, task];
        else if (taskDate.getTime() === yesterday.getTime())
          acc.yesterday = [...acc.yesterday, task];
        else if (taskDate >= thisWeekStart && taskDate < yesterday)
          acc.thisWeek = [...acc.thisWeek, task];
        else if (taskDate >= thisMonthStart && taskDate < thisWeekStart)
          acc.thisMonth = [...acc.thisMonth, task];
        else
          acc.older = [...acc.older, task];

        return acc;
      }, {
        today: [] as IQuickTask[],
        yesterday: [] as IQuickTask[],
        thisWeek: [] as IQuickTask[],
        thisMonth: [] as IQuickTask[],
        older: [] as IQuickTask[],
      });
    },
    getTranslator: () => {
      const { $i18n } = useNuxtApp();
      return $i18n.t;
    },
  },
  actions: {
    async recover() {
      const t = this.getTranslator;
      this.loading.recovering = true;

      try {
        const { data } = await useFetch<IQuickTask[]>("/api/productivity/quick-task");
        if (!data.value) return;
        this.tasks = data.value;
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
      finally {
        this.loading.recovering = false;
      }
    },
    async addTask(label: string) {
      const t = this.getTranslator;
      this.loading.creating = true;

      try {
        const task = await $fetch<IQuickTask>("/api/productivity/quick-task", {
          method: "POST",
          body: {
            label,
          },
        });
        this.tasks = [...this.tasks, task];
        toast.success(t("quick-tasks.toasters.task-created", {
          label,
        }));
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
      finally {
        this.loading.creating = false;
      }
    },
    async updateTask(id: number, label: string) {
      const t = this.getTranslator;
      this.loading.creating = true;

      try {
        const task = await $fetch<IQuickTask>(`/api/productivity/quick-task/${id}`, {
          method: "PUT",
          body: {
            label,
          },
        });
        this.tasks = this.tasks.map(t => t.id === id ? task : t);
        toast.success(t("quick-tasks.toasters.task-updated"));
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
      finally {
        this.loading.creating = false;
      }
    },
    async toggleTask(id: number) {
      const t = this.getTranslator;
      const relatedTask = this.tasks.find(t => t.id === id);
      if (!relatedTask) return;

      try {
        const task = await $fetch<IQuickTask>(`/api/productivity/quick-task/${id}`, {
          method: "PUT",
          body: {
            completedAt: relatedTask.completedAt ? null : new Date(),
          },
        });
        this.tasks = this.tasks.map(t => t.id === id ? task : t);
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
    },
    async deleteTask(id: number) {
      const t = this.getTranslator;

      try {
        const task = await $fetch<IQuickTask>(`/api/productivity/quick-task/${id}`, {
          method: "DELETE",
        });
        this.tasks = this.tasks.filter(task => task.id !== id);
        toast.success(t("quick-tasks.toasters.task-deleted", {
          label: task.label,
        }), {
          action: {
            label: t("btn.undo"),
            onClick: () => this.rollbackTask(task),
          },
        });
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
    },
    async rollbackTask(old: IQuickTask) {
      const t = this.getTranslator;

      try {
        const task = await $fetch<IQuickTask>(`/api/productivity/quick-task/${old.id}`, {
          method: "POST",
          body: {
            ...old,
          },
        });
        this.tasks = [...this.tasks, task];
        toast.success(t("quick-tasks.toasters.task-recovered", {
          label: task.label,
        }));
      }
      catch {
        toast.error(t("toasters.server-error"));
      }
    },
  },
});
