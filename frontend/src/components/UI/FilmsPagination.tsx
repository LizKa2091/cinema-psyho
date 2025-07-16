import React, { FC } from 'react';
import { Pagination } from 'antd';

interface IFilmsPaginationProps {
   totalItems: number;
   currPage: number;
   pagesCount: number;
   handlePageChange: (currPage: number) => void;
}

const FilmsPagination: FC<IFilmsPaginationProps> = ({ totalItems, currPage, handlePageChange }) => {
   return (
      <div data-testid='films-pagination'>
         <Pagination align='center' total={totalItems-1} current={currPage} onChange={handlePageChange} pageSize={38} showSizeChanger={false} />
      </div>
   )
}

export default FilmsPagination;