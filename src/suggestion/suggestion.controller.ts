/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
// import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.suggestionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSuggestionDto: UpdateSuggestionDto) {
  //   return this.suggestionService.update(+id, updateSuggestionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suggestionService.remove(+id);
  }
}
