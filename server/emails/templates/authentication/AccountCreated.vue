<script setup lang="ts">
import { Heading, Text, Button, Row, Column } from "@vue-email/components";
import EmailLayout from "~/server/emails/EmailLayout.vue";

defineProps<{
  username: string;
}>();

const config = useRuntimeConfig();
const assistantName = config.public.assistant.name;
</script>

<template>
  <EmailLayout
    title="Welcome to Axyo ✨"
    :preview="`Hey ${username} → Jump in and start now`"
  >
    <Heading as="h1">
      Hey {{ username }},
    </Heading>
    <Text>Glad to have you here 🙌</Text>
    <Text><strong class="font-semibold">Axyo</strong> isn't just another app -- it's your personal space to get clear, stay on track, and grow your lifestyle the way <i class="italic">you</i> want.</Text>
    <Text>Here's what you can do starting today:</Text>

    <ul>
      <li>Track your goals and achievements</li>
      <li>Organize tasks and ideas in one place</li>
      <li>Reflect, plan, and stay focused</li>
      <li>Keep your life aligned -- with intention</li>
    </ul>

    <Text>Take your time. Explore.<br>I'll be right here whenever you need me.</Text>

    <Row class="text-center">
      <Column>
        <Button
          href="http://localhost:3000/app"
          class="px-3 py-2 rounded-md bg-primary text-primary-foreground"
        >
          → Jump in and start now
        </Button>
      </Column>
    </Row>

    <Text>Talk soon,<br>-- {{ assistantName }}</Text>
  </EmailLayout>
</template>
