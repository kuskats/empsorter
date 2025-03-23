import { useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import Filters from "../components/Filters";
import EmployeeForm from "../components/EmployeeForm";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); //стейт для открытия модалки
  const [editingEmployeeId, setEditingEmployeeId] = useState<
    number | undefined
  >(undefined);

  //открытие модалки для добавления сотрудника
  const openAddModal = () => {
    setEditingEmployeeId(undefined);
    setIsModalOpen(true);
  };
  //открытие модалки для редактирования сотрудника
  const openEditModal = (id: number) => {
    setEditingEmployeeId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-page">
      <h1>Список сотрудников</h1>
      <button className="addEmployee" onClick={openAddModal}>
        Добавить сотрудника
      </button>
      {/*рендер фильтров*/}
      <Filters />
      {/*рендер таблицы*/}
      <EmployeeTable onEdit={openEditModal} />
      {/*рендер модалки*/}
      <EmployeeForm
        isOpen={isModalOpen}
        onClose={closeModal}
        employeeId={editingEmployeeId}
      />
    </div>
  );
};

export default HomePage;
