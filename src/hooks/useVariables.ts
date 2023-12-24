import { useAppSelector } from "./redux";
import { cardsApi } from "../services/CardsServise";

const useVariables = () => {
  const { currentPage, limit } = useAppSelector(
    (state) => state.paginationReducer,
  );
  const {
    nameFilter,
    authorFilter,
    locationFilter,
    startDateFilter,
    endDateFilter,
  } = useAppSelector((state) => state.paintingsReducer);

  const { data } = cardsApi.useGetNameFilterQuery({
    name: nameFilter,
    authorId: authorFilter,
    locationId: locationFilter,
    startDate: startDateFilter,
    endDate: endDateFilter,
    page: currentPage,
    limit: limit,
  });

  const { data: dataWithoutLimit } = cardsApi.useGetNameFilterQuery({
    name: nameFilter,
    authorId: authorFilter,
    locationId: locationFilter,
    startDate: startDateFilter,
    endDate: endDateFilter,
  });

  return {
    data,
    dataWithoutLimit,
  };
};

export default useVariables;
