import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  buildPaginationMeta(
    baseUrl: string,
    page: number,
    limit: number,
    total: number,
  ) {
    const totalPages = Math.ceil(total / limit);

    if (totalPages > 0 && page > totalPages) {
      throw new BadRequestException(`Page must be between 1 and ${totalPages}`);
    }
    const next =
      page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;
    const previous =
      page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;

    return {
      count: total,
      totalPages,
      currentPage: page,
      pageSize: limit,
      next,
      previous,
    };
  }
}
