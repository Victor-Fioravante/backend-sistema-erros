import { Injectable } from "@nestjs/common";
import { EvaluationRepository } from "./evaluation.repository.interface";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEvaluationDto } from "../dto/create-evaluation.dto";
import { ResponseEvaluationDto } from "../dto/response-evaluation.dto";

@Injectable()
export class EvaluationPrismaRepository implements EvaluationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEvaluationDto) {
    return this.prisma.evaluation.create({
      data: {
        errorCode: dto.errorCode,
        clientCode: dto.clientCode,
        rating: dto.rating,
        comment: dto.comment,
        suggestionId: dto.suggestionId,
      },
    });
  }

  
  async get(): Promise<ResponseEvaluationDto[]> {
    const evaluations = await this.prisma.evaluation.findMany();
    return evaluations.map(e => ({
      errorCode: e.errorCode,
      clientCode: e.clientCode,
      rating: e.rating,
      suggestionId: e.suggestionId,
      date: e.createdAt,
      comment: e.comment === null ? undefined : e.comment
    }));
  }
  
  async countAll(): Promise<number> {
    return this.prisma.evaluation.count();
  }

  async countByRating(rating: boolean): Promise<number> {
    return this.prisma.evaluation.count({
      where: { rating },
    });
  }

  async findAllRatings(): Promise<{ suggestionId: number; rating: boolean }[]> {
    return this.prisma.evaluation.findMany({
      select: {
        suggestionId: true,
        rating: true,
      },
    });
  }
}