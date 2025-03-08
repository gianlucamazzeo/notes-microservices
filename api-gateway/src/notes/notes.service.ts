import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FindNotesQueryDto } from './dto/find-notes-query.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_SERVICE') private readonly notesServiceClient: ClientProxy,
  ) {}

  async create(userId: string, createNoteDto: CreateNoteDto) {
    const noteData = {
      ...createNoteDto,
      userId,
    };
    return firstValueFrom(
      this.notesServiceClient.send({ cmd: 'create_note' }, noteData),
    );
  }

  async findAll(userId: string, query: FindNotesQueryDto) {
    const findNotesDto = {
      userId,
      ...query,
    };
    return firstValueFrom(
      this.notesServiceClient.send({ cmd: 'find_notes' }, findNotesDto),
    );
  }

  async findOne(userId: string, id: string) {
    return firstValueFrom(
      this.notesServiceClient.send({ cmd: 'find_note' }, { id, userId }),
    );
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto) {
    return firstValueFrom(
      this.notesServiceClient.send(
        { cmd: 'update_note' },
        { id, userId, updateNoteDto },
      ),
    );
  }

  async remove(userId: string, id: string) {
    return firstValueFrom(
      this.notesServiceClient.send({ cmd: 'remove_note' }, { id, userId }),
    );
  }

  async getStats(userId: string) {
    return firstValueFrom(
      this.notesServiceClient.send({ cmd: 'get_notes_stats' }, userId),
    );
  }
}