import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  PrismaHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('monitoring')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Verify backend and database health' })
  check() {
    return this.health.check([
      () => this.prismaHealth.pingCheck('database', this.prisma),
    ]);
  }
}
