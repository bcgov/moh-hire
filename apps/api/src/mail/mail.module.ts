import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { FormEntity } from 'src/form/entity/form.entity';
import { MailService } from './mail.service';

@Module({})
export class MailModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static register(options: any): DynamicModule {
    const imports = [TypeOrmModule.forFeature([FormEntity])];

    if (options.useMailTrap === true) {
      imports.push(
        MailerModule.forRootAsync({
          useFactory: () => ({
            transport: {
              host: process.env.EMAIL_SERVICE_HOST,
              port: +(process.env.EMAIL_SERVICE_PORT || 0),
              ignoreTLS: process.env.EMAIL_SERVICE_IGNORE_TLS === 'true',
              secure: process.env.EMAIL_SERVICE_SECURE === 'true',
              auth: {
                user: process.env.EMAIL_SERVICE_USER,
                pass: process.env.EMAIL_SERVICE_PASS,
              },
              pool: true, // use pooled connection
              maxConnections: 1,
              maxMessages: 1,
            },
            defaults: {
              from: process.env.MAIL_FROM,
            },
            template: {
              dir: __dirname + '/templates',
              adapter: new HandlebarsAdapter(),
              options: {
                strict: true,
              },
            },
            options: {
              partials: {
                dir: __dirname + '/templates/partials',
                options: {
                  strict: true,
                },
              },
            },
          }),
        }),
      );
    } else {
      const templatePath = path.resolve(`${__dirname}/templates/partials/layout.hbs`);
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      handlebars.registerPartial('layout', templateContent);
    }

    return {
      module: MailModule,
      imports,
      providers: [MailService],
      exports: [MailService],
    };
  }
}
