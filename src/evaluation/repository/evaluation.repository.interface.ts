import { CreateEvaluationDto } from "../dto/create-evaluation.dto";

export interface EvaluationRepository {
  create(dto: CreateEvaluationDto): Promise<any>;
  countAll(): Promise<number>;
  countByRating(rating: boolean): Promise<number>;
  findAllRatings(): Promise<{ errorCode: string; rating: boolean }[]>;
}