import type { ExtractComponentProps } from "@vue-email/render";
import { render } from "@vue-email/render";
import type { Component } from "vue";
import { useMailer } from "#mailer";

export async function compileTemplate<T extends Component>(options: {
  component: T;
  props: ExtractComponentProps<T>;
}) {
  return {
    html: await render(options.component, options.props, { pretty: true }),
    text: await render(options.component, options.props, { plainText: true }),
  };
}
export async function sendEmail<T extends Component>(mailOptions: {
  to: string;
  subject: string;
  attachments?: {
    filename: string;
    path: string;
    contentType: string;
  }[];
}, componentOptions: {
  component: T;
  props: ExtractComponentProps<T>;
}) {
  const mailer = useMailer();

  const { mailer: mailerConfig } = useRuntimeConfig();
  const { user, pass, host, port, from } = mailerConfig;

  const transporter = mailer.customTransporter({
    auth: {
      user,
      pass,
    },
    host,
    port: Number(port),
    secure: true,
  });

  return await mailer.sendMail({
    transporter,
    requestId: "dev-email",
    options: {
      ...mailOptions,
      fromName: from.name,
      fromEmail: from.email,
      ...await compileTemplate(componentOptions),
    },
  });
}
