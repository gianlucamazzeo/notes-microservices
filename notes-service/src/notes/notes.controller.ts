import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FindNotesDto } from './dto/find-notes.dto';

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @MessagePattern({ cmd: 'create_note' })
  create(@Payload() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @MessagePattern({ cmd: 'find_notes' })
  findAll(@Payload() findNotesDto: FindNotesDto) {
    return this.notesService.findAll(findNotesDto);
  }

  @MessagePattern({ cmd: 'find_note' })
  findOne(@Payload() data: { id: string; userId: string }) {
    return this.notesService.findOne(data.id, data.userId);
  }

  @MessagePattern({ cmd: 'update_note' })
  update(
    @Payload()
    data: {
      id: string;
      userId: string;
      updateNoteDto: UpdateNoteDto;
    },
  ) {
    return this.notesService.update(data.id, data.userId, data.updateNoteDto);
  }

  @MessagePattern({ cmd: 'remove_note' })
  remove(@Payload() data: { id: string; userId: string }) {
    return this.notesService.remove(data.id, data.userId);
  }

  @MessagePattern({ cmd: 'get_notes_stats' })
  getStats(@Payload() userId: string) {
    return this.notesService.getStats(userId);
  }
}
