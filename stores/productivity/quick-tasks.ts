import { toast } from "vue-sonner";
import type { QuickTasksState } from "~/types/miscellaneous/states";
import type { IQuickTask } from "~/types/productivity/quick-tasks";

export const useQuickTasksStore = defineStore("quick-tasks", {
  state: (): QuickTasksState => ({
    tasks: [],
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

      return state.tasks.reduce((acc, task) => {
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
      this.loading.recovering = true;

      setTimeout(() => {
        this.loading.recovering = false;
      }, Math.floor(Math.random() * 500) + 1000);
    },
    async addTask(label: string) {
      const t = this.getTranslator;

      this.tasks = [
        ...this.tasks,
        {
          id: this.tasks.length + 1,
          userUuid: "me",
          label,
          createdAt: new Date(),
        },
      ];
      toast.success(t("quick-tasks.toasters.task-created", {
        label,
      }));
    },
    async updateTask(id: number, label: string) {
      const t = this.getTranslator;

      this.tasks = this.tasks.map(task => task.id === id ? { ...task, label } : task);
      toast.success(t("quick-tasks.toasters.task-updated"));
    },
    async toggleTask(id: number) {
      this.tasks = this.tasks.map(task => task.id === id ? { ...task, completedAt: task.completedAt ? null : new Date() } : task);
    },
    async deleteTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
  },
});
