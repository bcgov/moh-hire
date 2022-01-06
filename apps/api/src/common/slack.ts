import { Logger } from '@nestjs/common';
import axios from 'axios';
import yaml from 'js-yaml';

const webhookUrl = process.env.SLACK_ALERTS_WEBHOOK_URL;

export default async function postToSlack(data: unknown): Promise<void> {
  if (webhookUrl) {
    await axios.post(webhookUrl, {
      text: `${'```'}${yaml.dump(data)}${'```'}`,
    });
  } else {
    Logger.warn('SLACK_ALERTS_WEBHOOK_URL not available, Slack alert not sent', 'postToSlack');
  }
}
