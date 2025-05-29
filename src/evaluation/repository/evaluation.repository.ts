import { Injectable } from "@nestjs/common";
import { EvaluationRepository } from "./evaluation.repository.interface";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEvaluationDto } from "../dto/create-evaluation.dto";

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

  async countAll(): Promise<number> {
    return this.prisma.evaluation.count();
  }

  async countByRating(rating: boolean): Promise<number> {
    return this.prisma.evaluation.count({
      where: { rating },
    });
  }

  async findAllRatings(): Promise<{ errorCode: string; rating: boolean }[]> {
    return this.prisma.evaluation.findMany({
      select: {
        errorCode: true,
        rating: true,
      },
    });
  }
}