import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FindNotesDto } from './dto/find-notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    const newNote = new this.noteModel({
      ...createNoteDto,
      userId: new Types.ObjectId(createNoteDto.userId),
    });
    return newNote.save();
  }

  async findAll(findNotesDto: FindNotesDto): Promise<NoteDocument[]> {
    const {
      userId,
      searchTerm,
      tag,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
    } = findNotesDto;

    // Costruisci la query di base
    const query: any = { userId: new Types.ObjectId(userId) };

    // Aggiungi filtro di ricerca se specificato
    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }

    // Aggiungi filtro per tag se specificato
    if (tag) {
      query.tags = tag;
    }

    // Esegui la query con ordinamento
    return this.noteModel
      .find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<NoteDocument> {
    const note = await this.noteModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async update(
    id: string,
    userId: string,
    updateNoteDto: UpdateNoteDto,
  ): Promise<NoteDocument> {
    const note = await this.noteModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      },
      { $set: updateNoteDto },
      { new: true },
    );

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async remove(id: string, userId: string): Promise<NoteDocument> {
    const note = await this.noteModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async getStats(userId: string): Promise<any> {
    const totalNotes = await this.noteModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });

    const archivedNotes = await this.noteModel.countDocuments({
      userId: new Types.ObjectId(userId),
      isArchived: true,
    });

    const tagCounts = await this.noteModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return {
      totalNotes,
      archivedNotes,
      activeNotes: totalNotes - archivedNotes,
      tags: tagCounts,
    };
  }
}
