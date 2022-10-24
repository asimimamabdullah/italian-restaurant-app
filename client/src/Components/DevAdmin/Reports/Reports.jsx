import React, { useState, useEffect, useCallback } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import "./Reports.css";
import { useStateValue } from "../../../StateProvider";

const Reports = () => {
	const { token } = useStateValue();

	const [error, setError] = useState(null);
	const [array, setArray] = useState([]);
	const [showContent, setShowContent] = useState(false);
	const [month, setMonth] = useState(0);

	const generatePDF = async () => {
		var doc = new jsPDF("p", "pt", "a4");

		doc.html(document.querySelector("#content"), {
			callback: function (pdf) {
				pdf.save("mypdf.pdf");
			},
		});
	};

	const getReport = useCallback(async () => {
		if (month !== 0) {
			try {
				const report = await axios.get(`/api/dashboard/reports/${month}`, {
					headers: {
						Authorization: `Bearer ${token[0]}`,
					},
				});
				setArray(report.data.array);
				setShowContent(true);
				return report;
			} catch (error) {
				setError(error.response.data.error);
			}
		}
	}, [month, token]);

	useEffect(() => {
		getReport();
	}, [getReport]);

	if (error) {
		setTimeout(() => {
			setError(null);
		}, 2000);
	}

	return (
		<div className="dashboard__reports">
			{error && <div className="error__box">{error}</div>}

			<div className="dashboard__reports-buttons">
				<button onClick={generatePDF} type="primary">
					Generate Pdf
				</button>
				<br />
				<select
					id="reports__months"
					onChange={(e) => setMonth(parseInt(e.target.value))}>
					<option value="0">Select Month for Report</option>
					<option value="1">January</option>
					<option value="2">February</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
			</div>

			<div
				id="content"
				style={{
					visibility: showContent ? "visible" : "hidden",
					margin: "20px auto",
				}}>
				<table>
					<thead>
						<tr>
							<th>name</th>
							<th>email</th>
							<th>amount</th>
						</tr>
					</thead>
					<tbody>
						{array.map((item, i) => (
							<tr key={i}>
								<td style={{ textTransform: "capitalize" }}>
									{item.name + " " + item.lastName}
								</td>
								<td>{item?.email} </td>
								<td>{item?.total}</td>
							</tr>
						))}
						<tr>
							<td>Total</td>
							<td
								colSpan={2}
								style={{
									textAlign: "right",
									paddingRight: "60px",
									fontSize: "larger",
								}}>
								{array?.reduce(
									(amount, item) =>
										// item.orderStatus === "delivered"
										item.deliveryOption === "takeaway"
											? item.total + amount
											: item.deliveryOption === "homedelivery"
											? item.total +
											  parseInt(item.deliveryCharges) +
											  amount
											: 0,
									0,
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Reports;
