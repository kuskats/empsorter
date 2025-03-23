import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setFilters, setSort } from "../store/reducers";

const Filters: React.FC = () => {
  const dispatch = useDispatch(); //диспатч для отправки данных в редюсер
  const { filters, sort } = useSelector((state: RootState) => state.employees);

  //обработчик изменения должности в селекторе
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ ...filters, role: e.target.value || null }));
  };
  //обработчик изменения чекбокса архива
  const handleArchiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ ...filters, isArchive: e.target.checked }));
  };

  //обработчик сортировки по имени и др
  const handleSort = (field: "name" | "birthday") => {
    const newOrder =
      sort.field === field && sort.order === "asc" ? "desc" : "asc";
    dispatch(setSort({ field, order: newOrder }));
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Должность:</label>
        <select value={filters.role || ""} onChange={handleRoleChange}>
          <option value="">Все</option>
          <option value="Повар">Повар</option>
          <option value="Официант">Официант</option>
          <option value="Водитель">Водитель</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={filters.isArchive}
            onChange={handleArchiveChange}
          />
          В архиве
        </label>
      </div>

      <div className="sort-buttons">
        <button onClick={() => handleSort("name")}>
          Сортировать по имени{" "}
          {sort.field === "name" && (sort.order === "asc" ? "↑" : "↓")}
        </button>
        <button onClick={() => handleSort("birthday")}>
          Сортировать по дате{" "}
          {sort.field === "birthday" && (sort.order === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
};

export default Filters;
