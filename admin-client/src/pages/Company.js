import { useEffect, useState } from 'react';
import axios from '../api/axios';
import useCompany from '../hooks/useCompany';

export default function Company() {
    const { company, hasCompany, refetch } = useCompany();
    const [companies, setCompanies] = useState([]);
    const [newName, setNewName] = useState('');
    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('/users/companies')
            .then((r) => setCompanies(r.data))
            .catch(() => setCompanies([]));
    }, []);

    const create = async () => {
        if (!newName.trim()) return alert('Geben Sie einen Namen ein');
        try {
            await axios.post('/users/company/create', { name: newName.trim() });
            setNewName('');
            await refetch();
        } catch (e) {
            setError(e.response?.data?.msg || 'Erstellung fehlgeschlagen');
        }
    };

    const save = async () => {
        if (!editName.trim()) return alert('Geben Sie einen Namen ein');
        try {
            await axios.put('/users/companyEdit', { name: editName.trim() });
            setEdit(false);
            await refetch();
        } catch (e) {
            setError(e.response?.data?.msg || 'Fehler beim Speichern');
        }
    };

    if (hasCompany) {
        return (
            <div className="card shadow-sm p-4" style={{ maxWidth: 500 }}>
                {!edit ? (
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="fs-5">{company.name}</span>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => { setEdit(true); setEditName(company.name); }}>
                            Bearbeiten
                        </button>
                    </div>
                ) : (
                    <div>
                        <input
                            className="form-control mb-3"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Firmenname"
                        />
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary" onClick={save}>Speichern</button>
                            <button className="btn btn-secondary" onClick={() => setEdit(false)}>Abbrechen</button>
                        </div>
                    </div>
                )}

                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        );

    }
    return (
        <div className="card shadow-sm p-4" style={{ maxWidth: 500 }}>
            <h5 className="mb-3">Wählen Sie ein Unternehmen oder erstellen Sie eines</h5>

            <div className="mb-3">
                <input
                    className="form-control mb-2"
                    placeholder="Name des neuen Unternehmens"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button className="btn btn-success w-100" onClick={create}>Erstellen</button>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}
