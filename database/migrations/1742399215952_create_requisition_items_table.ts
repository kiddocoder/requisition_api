import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'requisition_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable().unsigned().primary()
      table.bigInteger("requisition_id")
      .unsigned()
      .references('id')
      .inTable('requisitions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      
      table.bigInteger('article_id')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('articles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')       

      table.bigInteger('quantite_demande').defaultTo(0)
      table.string('unite_mesure').defaultTo("pièce")
      table.bigInteger('prix_unitaire').defaultTo(0)
      table.bigInteger('prix_total').defaultTo(0)
      table.string('priority').nullable()
      table.string('transaction_type').nullable().defaultTo("cash")
      table.bigInteger("avance_credit").defaultTo(0)
      table.bigInteger('supplier_id')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('suppliers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      table.boolean('is_deleted').defaultTo(false)
      table.timestamps()
      table.index(["requisition_id","supplier_id"])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}