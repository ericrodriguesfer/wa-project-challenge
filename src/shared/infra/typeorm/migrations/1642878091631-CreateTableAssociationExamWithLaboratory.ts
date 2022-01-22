import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableAssociationExamWithLaboratory1642878091631
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'association',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'exam_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'laboratory_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'association',
      new TableForeignKey({
        name: 'relation-exam-with-laboratory',
        columnNames: ['exam_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'exam',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'association',
      new TableForeignKey({
        name: 'relation-laboratory-with-exam',
        columnNames: ['laboratory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'laboratory',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'laboratory',
      'relation-laboratory-with-exam',
    );
    await queryRunner.dropForeignKey(
      'laboratory',
      'relation-exam-with-laboratory',
    );
    await queryRunner.dropTable('association');
  }
}
