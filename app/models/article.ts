import { afterSave, BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Requisition from './requisition.js'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare uniqueId: string

  @column()
  declare unite_mesure: string 

  @column()
  declare description: string | null

  @column()
  declare image: string | null

  @column()
  declare image_name: string | null 

  @column()
  declare isDeleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async generateUniqueId(article: Article) {
    const idStr = article.id.toString().padStart(4, '0');
    const randomPart = Math.random().toString(36).substring(2, 4).padStart(3, '0');
    article.uniqueId = article.name.slice( 0, 3) +'-'+ randomPart+idStr;
  }

  @manyToMany(() => Requisition, {
    pivotTable: 'requisition_items',
    localKey: 'id',
    pivotForeignKey: 'article_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'requisition_id',
    pivotColumns: [
      'quantite_demande',
      'prix_unitaire',
      'prix_total',
      'transaction_type',
      'avance_credit',
      'supplier_id',
      'is_deleted'
    ]
  })
  declare requisitions: ManyToMany<typeof Requisition>
}