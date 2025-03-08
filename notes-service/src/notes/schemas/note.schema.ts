import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ default: [] })
  tags: string[];

  @Prop({ default: false })
  isArchived: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);

// Indice per migliorare le ricerche per userId
NoteSchema.index({ userId: 1 });
// Indice di testo su titolo e contenuto per le ricerche full-text
NoteSchema.index({ title: 'text', content: 'text' });
