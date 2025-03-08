import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FindNotesQueryDto } from './dto/find-notes-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nuova nota' })
  @ApiResponse({ status: 201, description: 'Nota creata con successo' })
  create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(req.user.userId, createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: "Ottieni tutte le note dell'utente" })
  @ApiResponse({ status: 200, description: 'Elenco delle note' })
  findAll(@Request() req, @Query() query: FindNotesQueryDto) {
    return this.notesService.findAll(req.user.userId, query);
  }

  @Get('stats')
  @ApiOperation({ summary: "Ottieni statistiche sulle note dell'utente" })
  @ApiResponse({ status: 200, description: 'Statistiche delle note' })
  getStats(@Request() req) {
    return this.notesService.getStats(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ottieni una nota specifica' })
  @ApiResponse({ status: 200, description: 'Dettagli della nota' })
  @ApiResponse({ status: 404, description: 'Nota non trovata' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.notesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Aggiorna una nota esistente' })
  @ApiResponse({ status: 200, description: 'Nota aggiornata con successo' })
  @ApiResponse({ status: 404, description: 'Nota non trovata' })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(req.user.userId, id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una nota' })
  @ApiResponse({ status: 200, description: 'Nota eliminata con successo' })
  @ApiResponse({ status: 404, description: 'Nota non trovata' })
  remove(@Request() req, @Param('id') id: string) {
    return this.notesService.remove(req.user.userId, id);
  }
}
