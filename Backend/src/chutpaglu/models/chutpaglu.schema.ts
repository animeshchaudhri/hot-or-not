
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ChutPagluDocument = HydratedDocument<ChutPaglu>;

@Schema()
export class ChutPaglu {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId

  @Prop()
  rank: number;

  @Prop({ required: true })
  imageURL: string;

  @Prop({ required: true })
  deleted: boolean;
}

export const ChutPagluSchema = SchemaFactory.createForClass(ChutPaglu);
