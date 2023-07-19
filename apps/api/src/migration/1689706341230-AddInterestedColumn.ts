import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddInterestedColumn1689706341230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'submission',
      new TableColumn({
        name: 'withdrawn',
        type: 'bool',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('submission', 'withdrawn');
  }
}
