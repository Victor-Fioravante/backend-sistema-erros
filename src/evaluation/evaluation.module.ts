import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EvaluationPrismaRepository } from './repository/evaluation.repository';

@Module({
  controllers: [EvaluationController],
  providers: [
    EvaluationService,
    PrismaService,
    {
      provide: 'EvaluationRepository',
      useClass: EvaluationPrismaRepository,
    },
  ],
})
export class EvaluationModule {}
