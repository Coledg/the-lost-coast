import { useState } from "react";
export default function Filters({ submitFunc }) {
    const [formData, setFormData] = useState({ startDate: "", endDate: "" })
    const handleChange = (evt) => {
        setFormData(data => {
            return {
                ...data,
                [evt.target.name]: evt.target.value
            }
        })
    }
    const submitHandler = async (evt) => {
        evt.preventDefault();
        const fetchURL = 'http://localhost:3000/retrieve-data?';
        const data = await fetch(fetchURL + new URLSearchParams({
            startDate: formData.startDate,
            endDate: formData.endDate
        }))
        const parsedData = await data.json();
        submitFunc(formData, parsedData);
    }
    return (
        <div className="Filters">
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