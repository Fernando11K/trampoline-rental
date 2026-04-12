const baseApi = "http://127.0.0.1:5000";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
})

const clearErrors = () => {
    document.querySelectorAll(".input-error").forEach(el => {
        el.classList.remove("input-error");
    });

    document.querySelectorAll(".field-error").forEach(el => {
        el.classList.remove("field-error");
    });

    document.querySelectorAll(".error-message").forEach(el => {
        el.innerText = "";
    });
};

const applyErrors = (errors) => {
    errors.forEach(error => {
        const field = error.loc[0];
        if (!field) return;

        const input = document.querySelector(`[name="${field}"]`);

        if (input) {
            input.classList.add("input-error");
            input.parentElement.classList.add("field-error");

            const message = input.parentElement.querySelector(`.error-message[data-error-for="${field}"]`);
            if (message) {
                message.innerText = validationMessagePt(error)?.replace("Value error,", "")?.trim();
            }
        }
    });
};


const formatDateForTable = (date) => {
    const dateProcessed = new Date(`${date}T00:00:00`)
    return dateFormatter.format(dateProcessed);

}
const formatCurrencyBRL = (value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const getRentStatus = (canceled) => canceled ? "Cancelado" : "Agendado";

const getAllRents = async () => {
    try {
        const response = await fetch(`${baseApi}/rent`);
        const body = await response.json();
        if (!response.ok) {
            alert(body?.message ?? "Ocorreu um erro");
            return [];
        }
        return Array.isArray(body) ? body : [];
    } catch {
        alert("Erro ao se conectar com servidor");
        return [];
    }
};

const renderTable = async () => {
    const rents = await getAllRents()
    const list = Array.isArray(rents) ? rents : []

    const rows = list.map(rent => {
        const actionButton = rent.canceled
            ? `<button type="button" title="Reagendar aluguel" data-action="reactivate-rent" data-rent-id="${rent.id}">
                <i class="fa-solid fa-rotate-left" style="color: rgb(21, 85, 242);"></i>
              </button>`
            : `<button type="button" title="Cancelar aluguel" data-action="cancel-rent" data-rent-id="${rent.id}">
                <i class="fa-solid fa-ban" style="color: rgb(242, 21, 21);"></i>
              </button>`;

        return `      <tr>
                        <td>
                        ${actionButton}
                        <button type="button" title="Excluir agendamento" data-action="delete-rent" data-rent-id="${rent.id}">
                            <i class="fa-solid fa-trash" style="color: rgb(128, 128, 128);"></i>
                        </button>
                        </td>
                        <td>${formatDateForTable(rent.rent_date)}</td>
                        <td>${rent.hours_rented}h</td>
                        <td>${formatCurrencyBRL(rent.rent_amount)}</td>
                        <td>${getRentStatus(rent.canceled)}</td>
                        <td>${rent.renter}</td>
                    </tr>
                    `

    }).join("")

    const bodyTable = document.getElementById('body-table')
    bodyTable.innerHTML = list.length === 0
        ? `<tr><td colspan="6">Não foram localizados registros</td></tr>`
        : rows
}

const cancelRent = async (rentID) => {
    try {
        const response = await fetch(`${baseApi}/rent/${rentID}`, { method: "PATCH" });
        const body = await response.json();
        alert(body?.message ?? "Não foi possível cancelar.");
        if (response.ok) {
            renderTable();
        }
    } catch {
        alert("Erro ao se conectar com servidor");
    }
};

const reactivateRent = async (rentID) => {
    try {
        const response = await fetch(`${baseApi}/rent/${rentID}/reactivate`, { method: "PATCH" });
        const body = await response.json();
        alert(body?.message ?? "Não foi possível reagendar.");
        if (response.ok) {
            renderTable();
        }
    } catch {
        alert("Erro ao se conectar com servidor");
    }
};

const deleteRent = async (rentID) => {
    try {
        const response = await fetch(`${baseApi}/rent/${rentID}`, { method: "DELETE" });
        const body = await response.json();
        alert(body?.message ?? "Não foi possível excluir.");
        if (response.ok) {
            renderTable();
        }
    } catch {
        alert("Erro ao se conectar com servidor");
    }
};


const formulario = document.getElementById("form");

document.getElementById("body-table").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id = btn.dataset.rentId;
    if (id == null || id === "") return;

    if (btn.dataset.action === "cancel-rent") {
        cancelRent(Number(id));
    }
    if (btn.dataset.action === "reactivate-rent") {
        reactivateRent(Number(id));
    }
    if (btn.dataset.action === "delete-rent") {
        deleteRent(Number(id));
    }
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const hoursRaw = formulario.hours_rented.value.trim();
    const dados = {
        rent_date: formulario.rent_date.value,
        hours_rented: Number(formulario.hours_rented.value),
        rent_amount: formulario?.rent_amount?.value?.replace(/\./g, "")?.replace(",", "."),
        renter: formulario.renter.value
    };
    if (hoursRaw !== "") {
        dados.hours_rented = Number(hoursRaw);
    }

    scheduleRental(dados)
});



const scheduleRental = async (dados) => {
    try {
        clearErrors();
        const response = await fetch(`${baseApi}/rent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        const body = await response.json();

        if (response.status === 201) {
            alert("Adicionado com sucesso");
            renderTable();
            return;
        }

        if (Array.isArray(body)) {
            applyErrors(body);
            return;
        }

        alert(body?.message ?? "Não foi possível agendar.");
    } catch {
        alert("Erro de conexão com o servidor");
    }
};



renderTable()
