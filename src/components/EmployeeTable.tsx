import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../store/actions";
import { RootState, AppDispatch } from "../store/store";
import { selectFilteredEmployees } from "../store/selectors/index";

//интерфейс для пропсов таблицы
interface EmployeeTableProps {
  onEdit: (id: number) => void; //колбек для редактирования сотрудника
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ onEdit }) => {
  const dispatch = useDispatch<AppDispatch>(); //диспатч для отправки данных в редюсер
  const employees = useSelector(selectFilteredEmployees); //селектор для получения данных по фильтрам
  const { loading, error } = useSelector((state: RootState) => state.employees); //статус загрузки и ошибка

  //загрузка данных сотрудников
  useEffect(() => {
    dispatch(fetchEmployees()); //диспатч экшена для получения массива с сотрудниками
  }, [dispatch]);

  if (loading) return <div>Загрузка</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Должность</th>
            <th>Телефон</th>
            <th>Дата рождения</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {/*рендер таблицы*/}
          {employees.map((employee) => (
            <tr key={employee.id} onClick={() => onEdit(employee.id)}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.phone}</td>
              <td>{employee.birthday}</td>
              <td>
                <span
                  className={`status ${
                    employee.isArchive ? "archived" : "active"
                  }`}
                >
                  {employee.isArchive ? "В архиве" : "Активен"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
