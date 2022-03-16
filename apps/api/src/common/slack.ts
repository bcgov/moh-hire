import { Logger } from '@nestjs/common';
import axios from 'axios';
import yaml from 'js-yaml';

const webhookUrl = process.env.SLACK_ALERTS_WEBHOOK_URL;

interface SlackPayload {
  message: string | object;
  stack?: string;
  context?: string;
}

export default async function postToSlack(data: SlackPayload): Promise<void> {
  if (webhookUrl) {
    try {
      await axios.post(
        webhookUrl,
        {
          text: `${'```'}${yaml.dump(data)}${'```'}`,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } catch (e) {
      Logger.warn(`Failed to send message to slack: ${e.message}`, 'postToSlack');
    }
  } else {
    Logger.warn('SLACK_ALERTS_WEBHOOK_URL not available, Slack alert not sent', 'postToSlack');
  }
}
