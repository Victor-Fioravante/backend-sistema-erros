import { CreateEvaluationDto } from "../dto/create-evaluation.dto";
import { ResponseEvaluationDto } from "../dto/response-evaluation.dto";

export interface EvaluationRepository {
  create(dto: CreateEvaluationDto): Promise<any>;
  countAll(): Promise<number>;
  countByRating(rating: boolean): Promise<number>;
  findAllRatings(): Promise<{ suggestionId: number; rating: boolean }[]>;
  get(dto: ResponseEvaluationDto): Promise<any>
}