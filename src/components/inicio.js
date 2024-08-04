import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './inicio.css'; // Archivo CSS para los estilos de la tabla
import { Modal, Button, Form } from 'react-bootstrap'; // Importa componentes de Bootstrap para el modal

const Inicio = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
        id: '',
        username: '',
        email: '',
        roles: []
    });
    const [isAdmin, setIsAdmin] = useState(false);

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [roleSeleccionado, setRoleSeleccionado] = useState({ id: '', role_name: '' });

    useEffect(() => {
        fetchUsuarios();
        fetchRoles();
        checkAdmin();
    }, []);

    const fetchUsuarios = () => {
        axios.get('http://localhost:4000/usuarios')
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const fetchRoles = () => {
        axios.get('http://localhost:4000/roles')
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => console.error('Error fetching roles:', error));
    };

    const checkAdmin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decodificar el token para obtener la información del usuario (por ejemplo, roles)
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (decodedToken && decodedToken.roles.includes('admin')) {
                setIsAdmin(true);
            }
        }
    };

    const handleEditarUsuario = (usuario) => {
        setUsuarioSeleccionado({
            ...usuario,
            roles: usuario.roles ? usuario.roles.map(role => role.role_name) : [] // Asegúrate de que roles no sea undefined
        });
        setShowModal(true);
    };

    const handleEliminarUsuario = (id) => {
        axios.delete(`http://localhost:4000/usuarios/${id}`)
            .then(response => {
                console.log('Usuario eliminado:', response.data);
                fetchUsuarios(); // Actualizar la lista de usuarios después de la eliminación
                alert('Usuario eliminado correctamente');
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleActualizarUsuario = () => {
        const { id, username, email, roles } = usuarioSeleccionado;
        axios.put(`http://localhost:4000/usuarios/${id}`, { username, email, roles })
            .then(response => {
                console.log('Usuario actualizado:', response.data);
                fetchUsuarios(); // Actualizar la lista de usuarios después de la actualización
                setShowModal(false);
                alert('Usuario actualizado correctamente');
            })
            .catch(error => console.error('Error updating user:', error));
    };

    const handleRoleChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setUsuarioSeleccionado({ ...usuarioSeleccionado, roles: selectedOptions });
    };

    const handleAgregarRole = () => {
        setRoleSeleccionado({ id: '', role_name: '' });
        setShowRoleModal(true);
    };

    const handleEditarRole = (role) => {
        setRoleSeleccionado(role);
        setShowRoleModal(true);
    };

    const handleEliminarRole = (id) => {
        axios.delete(`http://localhost:4000/roles/${id}`)
            .then(response => {
                console.log('Rol eliminado:', response.data);
                fetchRoles(); // Actualizar la lista de roles después de la eliminación
                alert('Rol eliminado correctamente');
            })
            .catch(error => console.error('Error deleting role:', error));
    };

    const handleCloseRoleModal = () => {
        setShowRoleModal(false);
    };

    const handleGuardarRole = () => {
        if (roleSeleccionado.id) {
            // Actualizar rol
            axios.put(`http://localhost:4000/roles/${roleSeleccionado.id}`, { role_name: roleSeleccionado.role_name })
                .then(response => {
                    console.log('Rol actualizado:', response.data);
                    fetchRoles(); // Actualizar la lista de roles después de la actualización
                    setShowRoleModal(false);
                    alert('Rol actualizado correctamente');
                })
                .catch(error => console.error('Error updating role:', error));
        } else {
            // Crear nuevo rol
            axios.post('http://localhost:4000/roles', { role_name: roleSeleccionado.role_name })
                .then(response => {
                    console.log('Rol creado:', response.data);
                    fetchRoles(); // Actualizar la lista de roles después de la creación
                    setShowRoleModal(false);
                    alert('Rol creado correctamente');
                })
                .catch(error => console.error('Error creating role:', error));
        }
    };

    return (
        <div className="table-container">
            <h1>Gestión de Usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={usuario.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => handleEditarUsuario(usuario)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar usuario */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={usuarioSeleccionado.username}
                                onChange={(e) => setUsuarioSeleccionado({ ...usuarioSeleccionado, username: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={usuarioSeleccionado.email}
                                onChange={(e) => setUsuarioSeleccionado({ ...usuarioSeleccionado, email: e.target.value })}
                            />
                        </Form.Group>

                        {isAdmin && (
                            <Form.Group controlId="formRoles">
                                <Form.Label>Roles</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="form-select"
                                    multiple
                                    value={usuarioSeleccionado.roles}
                                    onChange={handleRoleChange}
                                >
                                    {roles.map(role => (
                                        <option key={role.id} value={role.role_name}>
                                            {role.role_name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleActualizarUsuario}>
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1>Gestión de Roles</h1>
            <button className="btn btn-success btn-sm" onClick={handleAgregarRole}>Agregar Rol</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre del Rol</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr key={role.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{role.role_name}</td>
                            <td>
                                <button className="btn btn-primary btn-sm" onClick={() => handleEditarRole(role)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarRole(role.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar/agregar rol */}
            <Modal show={showRoleModal} onHide={handleCloseRoleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{roleSeleccionado.id ? 'Editar Rol' : 'Agregar Rol'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRoleName">
                            <Form.Label>Nombre del Rol</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter role name"
                                value={roleSeleccionado.role_name}
                                onChange={(e) => setRoleSeleccionado({ ...roleSeleccionado, role_name: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoleModal}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleGuardarRole}>
                        {roleSeleccionado.id ? 'Actualizar' : 'Guardar'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Inicio;
