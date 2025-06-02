import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { ResponseEvaluationDto } from './dto/response-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @Get()
  get(responseEvaluationDto: ResponseEvaluationDto) {
    return this.evaluationService.get(responseEvaluationDto);
  }

  @Get('dashboard')
  getDashboard() {
    return this.evaluationService.getDashboard();
  }
}
