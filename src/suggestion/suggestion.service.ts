import { Injectable } from '@nestjs/common';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseSuggestionDto } from './dto/response-suggestion-dto';

@Injectable()
export class SuggestionService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateSuggestionDto) {
    return this.prisma.suggestion.create({
      data: {
        errorCode: dto.errorCode,
        text: dto.text,
      },
    });
  }

  async findAll(errorCode?: string) : Promise<ResponseSuggestionDto[]> {
    let response: ResponseSuggestionDto[] = [];

    const newLocal = await this.prisma.suggestion.findMany({
      where: errorCode ? { errorCode } : {},
      include: { evaluations: true },
    });

    this.preencherResposta(newLocal, response);

    return response;
  }

  private preencherResposta(newLocal: ({ evaluations: { id: number; errorCode: string; createdAt: Date; clientCode: string; rating: boolean; comment: string | null; suggestionId: number; }[]; } & { id: number; errorCode: string; text: string; createdAt: Date; })[], response: ResponseSuggestionDto[]) {
    for (const suggestion of newLocal) {
      response.push({
        id: suggestion.id,
        errorCode: suggestion.errorCode,
        text: suggestion.text,
        createdAt: suggestion.createdAt,
        evaluationIds: suggestion.evaluations.map((evaluation) => evaluation.id),
      });
    }
  }

  async findOne(id: number) {
    return this.prisma.suggestion.findUnique({
      where: {id},
    });
  }
}
