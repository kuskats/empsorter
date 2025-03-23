import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMaskInput } from "react-imask";
import { RootState } from "../store/store";
import { Employee } from "../types";
import { addEmployee, updateEmployee } from "../store/reducers";
import Modal from "./Modal";

//интерфейс для пропсов формы
interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId?: number;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  isOpen,
  onClose,
  employeeId,
}) => {
  const dispatch = useDispatch(); //диспатч для отправки данных в редюсер
  const employees = useSelector((state: RootState) => state.employees.data); //селектор для получения данных сотрудников
  const modalRef = useRef<HTMLDivElement>(null); //реф для модалки

  //стоковое состояние формы
  const initialFormState = {
    name: "",
    role: "Повар",
    phone: "",
    birthday: "",
    isArchive: false,
  };

  const [formData, setFormData] = useState<
    Omit<Employee, "id"> & { id?: number }
  >(initialFormState);

  //ошибки валидации
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (employeeId) {
        //поиск сотрудника по id
        const employee = employees.find((emp) => emp.id === employeeId);
        if (employee) {
          setFormData(employee); //заполнение формы данными сотрудника
        } else {
          setFormData(initialFormState); //если сотрудник не найден, то стоковое состояние
        }
      }
    }
  }, [isOpen, employeeId]);

  //валидация формы
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Имя обязательно"; //проверка инпута на имя
    if (!formData.phone.match(/^\+7 \(\d{3}\) \d{3}-\d{2}\d{2}$/)) {
      //регекс телефона
      newErrors.phone = "Формат: +7 (XXX) XXX-XXXX";
    }
    if (
      !formData.birthday.match(
        /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d{4}$/
      ) //регекс др
    ) {
      newErrors.birthday = "Формат: DD.MM.YYYY";
    }
    setErrors(newErrors); //фиксируем ошибки
    return Object.keys(newErrors).length === 0; // возвращаем true если ошибок нет
  };

  //обработка отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return; //если есть ошибки, то не отправляем форму
    const newId = employeeId || employees.length + 1; //генерация id, релевантно до добавления фичи удаления
    const employeeData: Employee = {
      id: newId,
      name: formData.name,
      role: formData.role,
      phone: formData.phone,
      birthday: formData.birthday,
      isArchive: formData.isArchive,
    };

    if (employeeId) {
      dispatch(updateEmployee(employeeData)); //если есть id, диспатчим редюсер с апдейтом
    } else {
      dispatch(addEmployee(employeeData)); //если нет id, диспатчим редюсер с добавлением
    }
    handleClose();
  };

  //закрытие модалки
  const handleClose = () => {
    setFormData(initialFormState);
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div ref={modalRef}>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            {/*инпут для имени*/}
            <label htmlFor="nameInput">Имя</label>
            <input
              id="nameInput"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? "error" : ""}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          {/*выпадыш для должности*/}
          <div className="form-group">
            <label htmlFor="roleInput">Должность</label>
            <select
              id="roleInput"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="Повар">Повар</option>
              <option value="Официант">Официант</option>
              <option value="Водитель">Водитель</option>
            </select>
          </div>
          <div className="form-group">
            {/*инпут со смазкой для телефона*/}
            <label htmlFor="phomeInput">Телефон</label>
            <IMaskInput
              id="phomeInput"
              mask="+7 (000) 000-0000"
              value={formData.phone}
              onAccept={(value) => setFormData({ ...formData, phone: value })}
              placeholder="+7 (XXX) XXX-XXXX"
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>
          <div className="form-group">
            {/*инпут со смазкой для даты рождения*/}
            <label htmlFor="birthdayInput">Дата рождения</label>
            <IMaskInput
              id="birthdayInput"
              mask="00.00.0000"
              value={formData.birthday}
              onAccept={(value) =>
                setFormData({ ...formData, birthday: value })
              }
              placeholder="DD.MM.YYYY"
              className={errors.birthday ? "error" : ""}
            />
            {errors.birthday && (
              <div className="error-message">{errors.birthday}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="archiveInput">
              {/*чекбокс для архива*/}
              В архиве
              <input
                id="archiveInput"
                type="checkbox"
                checked={formData.isArchive}
                onChange={(e) =>
                  setFormData({ ...formData, isArchive: e.target.checked })
                }
              />
            </label>
          </div>
          {/*субмит*/}
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </Modal>
  );
};

export default EmployeeForm;
