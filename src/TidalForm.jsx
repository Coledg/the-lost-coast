import { useState } from "react";
export default function TidalForm({ submitFunc }) {
    const [formData, setFormData] = useState({ startDate: "", endDate: "" })
    const handleChange = (evt) => {
        setFormData(data => {
            return {
                ...data,
                [evt.target.name]: evt.target.value
            }
        })
    }
    const submitHandler = (evt) => {
        evt.preventDefault();
        submitFunc(formData);
    }
    return (
        <div className="TidalForm">
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="startDate">Start date</label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="endDate">End date</label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        onChange={handleChange} />
                </div>
                <button>Get Intervals</button>
            </form>
        </div>
    );
}