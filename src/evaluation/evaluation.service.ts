import { Inject, Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { EvaluationRepository } from './repository/evaluation.repository.interface';
import { ResponseEvaluationDto } from './dto/response-evaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(
    @Inject('EvaluationRepository')
    private readonly evaluationRepository: EvaluationRepository,
  ) {}
  
  async create(dto: CreateEvaluationDto) {
    return this.evaluationRepository.create(dto);
  }

  async get(dto: ResponseEvaluationDto) {
    return this.evaluationRepository.get(dto);
  }

  async getDashboard() {

    const totalCount = await this.evaluationRepository.countAll();

    const positiveCount = await this.evaluationRepository.countByRating(true);

    const totalAverage = totalCount === 0 ? null : positiveCount / totalCount;

    const evaluations = await this.evaluationRepository.findAllRatings();

    console.log("Avaliações recuperadas:", evaluations);

    const grouped = new Map<number, { total: number; positives: number }>();

    this.processarAvaliacoes(evaluations, grouped);

    const averageBySuggestion = Array.from(grouped.entries()).map(([suggestionId, data]) => ({
      suggestionId,
      average: data.total === 0 ? null : data.positives / data.total,
      }));
    
        return {
        totalAverage,
        averageBySuggestion,
      };
  }


  private processarAvaliacoes(evaluations: { suggestionId: number; rating: boolean; }[], grouped: Map<number, 
    { total: number; positives: number; }>) {
    for (const evaluation of evaluations) {
      const group = grouped.get(evaluation.suggestionId) || { total: 0, positives: 0 };
      group.total += 1;

      if (evaluation.rating === true) {
        group.positives += 1;
      }

      grouped.set(evaluation.suggestionId, group);
    }
  }
}
