import React, { useState } from 'react'

function BasicDetail() {

    const [ownerType , setOwnerType] = useState('')

    return (
        <div>
            <div class="main active">
                <div class="text">
                    <h2>Basic Detail</h2>
                    <p>Fill the basic information about Your pg</p>
                </div>
                <div class="input-text">
                    <div class="input-div">
                        <input type="text" required require id="user_name" />
                        <span>
                            City Name
                        </span>
                    </div>

                </div>

                <div class="input-text">
                    <div class="input-div">
                        <input type="text" required />
                        <span>Pg Name</span>
                    </div>

                </div>


                <div  className="row mb-4">
                    <p>Pg Type:</p>
                    
                    <div className="col-md-2">
                        <button
                            type="button"
                            className={`btn ${ownerType === 'pg' ? 'btn-outline-success' : 'btn-outline-danger'}`}
                            onClick={() => setOwnerType('pg')}
                            style={{ borderRadius: "20px" }}
                        >
                            PG
                        </button>
                    </div>
                    <div className="col-md-2">
                        <button
                            type="button"
                            className={`btn ${ownerType === 'mess' ? 'btn-outline-success' : 'btn-outline-danger'}`}
                            onClick={() => setOwnerType('mess')}
                            style={{ borderRadius: "20px" }}
                        >
                            Hostel
                        </button>
                    </div>
                </div>

                <div class="input-text">
                    <div class="input-div">
                        <input type="text" required require id="user_phone" />
                        <span>Price</span>
                    </div>
                   
                </div>

                <div class="input-text">
                    <div class="input-div">
                        <input type="text" required require id="user_phone"  />
                        <span>Security Deposit</span>
                    </div>
                    
                </div>
                <div class="input-text">
                    <div class="input-div">
                        <select required>
                            <option value="" disabled selected hidden>Гражданство</option>
                            <option>Россия</option>
                            <option>Индия</option>
                            <option>Китай</option>
                            <option>США</option>
                            <option>Иран</option>
                            <option>Ирак</option>
                            <option>ОАЭ</option>
                            <option>Пакистан</option>
                            <option>Южная Корея</option>
                        </select>

                    </div>
                    <div class="input-div">
                        <select required require class="company-type">
                            <option value="" disabled selected hidden>Форма организации</option>
                            <option value="legal_entity">Юридическое лицо</option>
                            <option value="sole_entrepreneurship">Индивидуальный предприниматель</option>
                            <option value="individual">Самозанятое лицо</option>
                        </select>
                    </div>
                </div>
                <div class="buttons">
                    <button class="next_button">Дальше</button>
                </div>
            </div>
        </div>
    )
}

export default BasicDetail