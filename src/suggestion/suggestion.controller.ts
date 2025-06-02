import { Controller, Get, Post, Body, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';

@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @Post()
  create(@Body() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionService.create(createSuggestionDto);
    // throw new NotFoundException('Faltou.');
  }

  @Get()
  async findAll(@Query('errorCode') errorCode: string) {
    return await this.suggestionService.findAll(errorCode);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const suggestion = await this.suggestionService.findOne(+id);
    if (!suggestion) {
      throw new NotFoundException('Sugestão não encontrada')
    }
    return suggestion;
  }
}
