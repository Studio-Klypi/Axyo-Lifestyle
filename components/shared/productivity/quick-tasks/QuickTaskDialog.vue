<script setup lang="ts">
import { LoaderCircle, ListPlus, Save } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { IQuickTask } from "~/types/productivity/quick-tasks";

const props = defineProps<{
  task?: IQuickTask;
}>();

const mode = computed(() => props.task ? "edit" : "new");
const open = ref<boolean>(false);
const labelMaxLength = 150;

const store = useQuickTasksStore();
const { loading } = storeToRefs(store);

const schema = toTypedSchema(z.object({
  label: z.string().max(labelMaxLength).nonempty(),
}));
const form = useForm({
  validationSchema: schema,
  initialValues: {
    label: props.task?.label ?? "",
  },
});
const submit = form.handleSubmit(async ({ label }) => {
  if (props.task) await store.updateTask(props.task.id, label);
  else await store.addTask(label);

  open.value = false;
});
</script>

<template>
  <Dialog
    :open="open"
    @update:open="open = $event"
  >
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ $t(`quick-tasks.dialog.${mode}.title`) }}
        </DialogTitle>
      </DialogHeader>

      <Separator />

      <form
        class="flex flex-col gap-4"
        @submit="submit"
      >
        <FormField
          v-slot="{ componentField, value }"
          name="label"
        >
          <FormItem>
            <FormLabel>
              {{ $t("quick-tasks.dialog.field.label") }}
            </FormLabel>
            <div class="relative">
              <FormControl v-bind="componentField">
                <Input
                  :maxlength="labelMaxLength"
                  class="pr-15"
                  :placeholder="$t('quick-tasks.dialog.field.placeholder')"
                />
              </FormControl>
              <span class="absolute top-2.5 right-2.5 text-xs text-muted-foreground/50">{{ value?.trim().length ?? 0 }}/{{ labelMaxLength }}</span>
            </div>
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button
            class="ml-auto"
            type="submit"
            :disabled="loading.creating"
          >
            <LoaderCircle
              v-if="loading.creating"
              class="animate-spin"
            />
            <template v-else>
              <Save v-if="mode === 'edit'" />
              <ListPlus v-else />
            </template>
            {{ $t(`quick-tasks.dialog.${mode}.action`) }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
