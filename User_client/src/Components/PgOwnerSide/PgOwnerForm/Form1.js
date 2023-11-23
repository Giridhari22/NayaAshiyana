import React, { useEffect, useState } from 'react'
import "./Form1.css"
import BasicDetail from './BasicDetail';

function Form1() {

  const [isHeartClicked, setHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setHeartClicked(!isHeartClicked);
  };
var main_form = document.querySelectorAll(".main");
var step_list = document.querySelectorAll(".progress-bar li");
var num = document.querySelector(".step-number");
var company_form = document.querySelectorAll(".company-form");
let formnumber = 0;

var action_click = document.querySelectorAll(".action_button");
action_click.forEach(function (action_form) {
    action_form.addEventListener('click', function () {
        if (!validateform()) {
            return false
        }
        this.classList.add('inactive');
    });
});
var next_click = document.querySelectorAll(".next_button");
if (next_click.length > 0) {
  // Add event listeners
 
  next_click.forEach(function (next_click_form) {
      next_click_form.addEventListener('click', function () {
          if (!validateform()) {
              return false
          }
          shownemail.innerHTML = email.value;
          shownphone.innerHTML = phone.value;
          formnumber++;
          updateform();
          progress_forward();
          contentchange();
      });
  });
}

var back_click = document.querySelectorAll(".back_button");
back_click.forEach(function (back_click_form) {
    back_click_form.addEventListener('click', function () {
        formnumber--;
        updateform();
        progress_backward();
        contentchange();
    });
});

var username = document.querySelector("#user_name");
var email = document.querySelector("#user_email");
var phone = document.querySelector("#user_phone");

var shownname = document.querySelector(".shown_name");
var shownemail = document.querySelector(".shown_email");
var shownphone = document.querySelector(".shown_phone");

var submit_click = document.querySelectorAll(".submit_button");
submit_click.forEach(function (submit_click_form) {
    submit_click_form.addEventListener('click', function () {
        shownname.innerHTML = username.value;
        formnumber++;
        updateform();
    });
});
useEffect(() => {
  var heart = document.querySelector(".fa-heart");
  if (heart) {
    heart.addEventListener('click', function () {
      heart.classList.toggle('heart');
    });
  }

  // Cleanup function to remove the event listener if the component unmounts
  return () => {
    if (heart) {
      heart.removeEventListener('click', function () {
        heart.classList.toggle('heart');
      });
    }
  };
}, []);



useEffect(() => {
  var share = document.querySelector(".fa-share-alt");

  if (share) {
    share.addEventListener('click', function () {
      share.classList.toggle('share');
  });
  }

  // Cleanup function to remove the event listener if the component unmounts
  return () => {
    if (share) {
      share.removeEventListener('click', function () {
        share.classList.toggle('share');
      });
    }
  };
}, []);

function updateform() {
    var test = document.querySelector("h3");

    main_form.forEach(function (mainform_number) {
        mainform_number.classList.remove('active');
    })
    main_form[formnumber].classList.add('active');

    company_form.forEach(function (content) {
        content.classList.remove('active');
        var companyType = document.querySelector(".company-type");
        switch (companyType.value) {
            case 'legal_entity':
                var obj = document.querySelector("#legal_entity");
                obj.classList.add('active');
                break;

            case 'sole_entrepreneurship':
                var obj = document.querySelector("#sole_entrepreneurship");
                obj.classList.add('active');
                break;

            case 'individual':
                var obj = document.querySelector("#individual");
                obj.classList.add('active');
                break;
        };
    });
}

function progress_forward() {
    // step_list.forEach(list => {

    //     list.classList.remove('active');

    // }); 


    num.innerHTML = formnumber + 1;
    step_list[formnumber].classList.add('active');
}

function progress_backward() {
    var form_num = formnumber + 1;
    step_list[form_num].classList.remove('active');
    num.innerHTML = form_num;
}

var step_num_content = document.querySelectorAll(".step-number-content");

function contentchange() {
  step_num_content.forEach(function (content) {
      content.classList.remove('active');
      content.classList.add('d-none');
  });

  if (formnumber < step_num_content.length) {
      step_num_content[formnumber].classList.add('active');
  } else {
      // Handle the case where formnumber is out of bounds.
      console.error('Formnumber is out of bounds:', formnumber);
  }
}



function validateform() {
    var validate = true;
    var validate_inputs = document.querySelectorAll(".main.active input");
    validate_inputs.forEach(function (validate_input) {
        validate_input.classList.remove('warning');
        if (validate_input.hasAttribute('require') && (validate_input.offsetWidth !== 0 || validate_input.offsetHeight !== 0)) {
            if (validate_input.value.length == 0) {
                validate = false;
                validate_input.classList.add('warning');
            }
        }
    });

    var validate_selects = document.querySelectorAll(".main.active select");
    validate_selects.forEach(function (validate_select) {
        validate_select.classList.remove('warning');
        if (validate_select.hasAttribute('require') && (validate_select.offsetWidth !== 0 || validate_select.offsetHeight !== 0)) {
            if (validate_select.value == "") {
                validate = false;
                validate_select.classList.add('warning');
            }
        }
    });

    return validate;

}

  return (
    <div>
      <div class=" containers">
        <div class="card">
          <div class="form">
            <div class="left-side">
              <div class="left-heading">
             
              <h4>  <img src="assets/img/Home.jpeg" alt="" title="" style={{ width: "100px", height: "50px" , borderRadius:"50%" }} /> Naya<span style={{color:'#71c55d'}}>Ashiyana</span> </h4>
              </div>
              <div class="steps-content">
                <h3>Шаг <span class="step-number">1</span></h3>
                <p class="step-number-content active">1 Заполните свою личную информацию.</p>
                <p class="step-number-content d-none"> 2 you are second.</p>
                <p class="step-number-content d-none"> 3 Help companies get to know you better by telling then about
                  your past experiences.</p>
                <p class="step-number-content d-none"> 4 Add your profile piccture and let companies find youy fast.
                </p>
              </div>
              <ul class="progress-bar">
                <li class="active"> 5 Basic Detail</li>
                <li>
                  <p> 6 Организация</p>
                </li>
                <li>
                  <p> 7 Фотография</p>
                </li>
                <li>
                  <p> 8 Подтверждение</p>
                </li>
                <li>
                  <p> 9 Гарантийное письмо</p>
                </li>
              </ul>



            </div>
            <div class="right-side">
              {/* <div class="main active">
                <div class="text">
                  <h2>Basic Detail</h2>
                  <p>Пожалуйста, представьтесь. Будем рады знакомству с Вами!</p>
                </div>
                <div class="input-text">
                  <div class="input-div">
                    <input type="text" required require id="user_name"/>
                      <span>Ваше имя</span>
                  </div>
                  <div class="input-div">
                    <input type="text" required />
                      <span>Ваша фамилия</span>
                  </div>
                </div>
                <div class="input-text">
                  <div class="input-div">
                    <input type="text" required require id="user_phone" />
                      <span>Номер телефона</span>
                  </div>
                  <div class="input-div">
                    <input type="text" required require id="user_email" />
                      <span>E-mail адрес</span>
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
              </div> */}
              <BasicDetail />
              <div class="main active">
                <div class="company-form" id="legal_entity">
                  <div class="text">
                    <h2>Ваша организация</h2>
                    <p>Укажите сведения о представляемом Вами юридическом лице.</p>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require/>
                        <span>Полное наименование</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require/>
                        <span>Краткое наименование</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Юридический адрес</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Почтовый адрес</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>ОГРН</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>ИНН</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>КПП</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Банк</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>БИК банка</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Расчетный счет</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Корреспондентский счет</span>
                    </div>
                  </div>
                  <div class="buttons button_space">
                    <button class="back_button">Назад</button>
                    <button class="next_button">Дальше</button>
                  </div>
                </div>

                <div class="company-form" id="sole_entrepreneurship">
                  <div class="text">
                    <h2>Ваша организация</h2>
                    <p>Укажите сведения об индивидуальном предпринимателе.</p>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Фамилия</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Имя</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Отчество</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>ИНН</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>ОГРНИП</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Адрес регистрации</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Почтовый адрес</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Банк</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>БИК банка</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Расчетный счет</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Корреспондентский счет</span>
                    </div>
                  </div>
                  <div class="buttons button_space">
                    <button class="back_button">Назад</button>
                    <button class="next_button">Дальше</button>
                  </div>
                </div>

                <div class="company-form" id="individual">
                  <div class="text">
                    <h2>Ваша организация</h2>
                    <p>Укажите сведения о самозанятом лице.</p>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Фамилия</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Имя</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Отчество</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Почтовый адрес</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Банк</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>БИК банка</span>
                    </div>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Расчетный счет</span>
                    </div>
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Корреспондентский счет</span>
                    </div>
                  </div>
                  <div class="buttons button_space">
                    <button class="back_button">Назад</button>
                    <button class="next_button">Дальше</button>
                  </div>
                </div>
              </div>
              <div class="main">
                <div class="text">
                  <h2>Фотография</h2>
                  <p>Ваши арендаторы хотят знать, как вы выглядите.</p>
                </div>
                <div class="user_card">
                  <span></span>
                  <div class="circle">
                    <span><img src="https://wpr-public.s3.amazonaws.com/wprorg/styles/resp_orig_custom_user_wide_1x/s3/s3fs-public/wpr/articles/2013/10/michael%20jackson.jpeg?itok=8AFU-IVK" /></span>
                  </div>
                  <div class="buttons button_card">
                    <button>Выбрать файл</button>
                    <button>Загрузить</button>
                  </div>
                </div>
                <div class="text-description">
                  <p>Допустимые форматы фотографий: PNG, JPG.</p>
                  <p>Максимальный размер файла: 2МБ.</p>
                </div>
                <div class="text">
                </div>
                <div class="buttons button_space">
                  <button class="back_button">Назад</button>
                  <button class="next_button">Дальше</button>
                </div>
              </div>

              <div class="main">
                <div class="text">
                  <h2>Подтвердите электронную почту</h2>
                  <p>На ваш адрес <span class="shown_email"></span> отправлено сообщение от The Hostels с кодом. Введите его и нажмите
                    "Подтвердить".</p>
                </div>
                <div class="input-text">
                  <div class="input-div">
                    <input type="text" required require />
                      <span>Код подтверждения e-mail</span>
                  </div>
                  <div class="buttons button_inline">
                  <button className={`confirm_company action_button ${isHeartClicked ? 'heart' : ''}`} onClick={handleHeartClick}>Подтвердить</button>
                  </div>
                </div>
                <br />
                  <div class="text">
                    <h2>Подтвердите номер телефона</h2>
                    <p>Мы отправили SMS на Ваш номер телефона <span class="shown_phone"></span>. Введите код из сообщения и нажмите "Подтвердить".</p>
                  </div>
                  <div class="input-text">
                    <div class="input-div">
                      <input type="text" required require />
                        <span>Код из SMS сообщения</span>
                    </div>
                    <div class="buttons button_inline">
                      <button class="confirm_phone action_button">Подтвердить</button>
                    </div>
                  </div>
                  <br />
                    <div class="text">
                      <h2>Не пришел код?</h2>
                      <p><a href="">Нажмите здесь</a>, чтобы отправить коды снова.</p>
                    </div>
                    <br />
                      <div class="buttons button_space">
                        <button class="back_button">Назад</button>
                        <button class="next_button">Дальше</button>
                      </div>
                    </div>

                    <div class="main">
                      <div class="text">
                        <h2>Гарантийное письмо</h2>
                        <p>Мы отправим Вам бланк гарантийного письма. Пожалуйста, распечатайте его, подпишите и отправьте нам обратно отсканированную копию.</p>
                      </div>
                      <br />
                        <div class="buttons button_inline">
                          <button class="confirm_company action_button">Получить бланк письма</button>
                        </div>
                        <br />
                          <br />
                            <div class="text">
                              <h2>Проверьте реквизиты</h2>
                              <p>Когда мы получим от  гарантийное письмо с банковскими реквизитами, мы отправим на них небольшую сумму денег. Реквизиты считаются проверенными в том случае, если Вы обнаружите наш денежный перевод. Поэтому пожалуйста, внимательно проверьте Ваши реквизиты и если все хорошо, то нажмите "Завершить".</p>
                            </div>
                            <br />
                              <div class="buttons button_space">
                                <button class="back_button">Назад</button>
                                <button class="submit_button">Завершить</button>
                              </div>
                            </div>

                            <div class="main" id="congrats-form">
                              <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                              </svg>

                              <div class="text congrats">
                                <h2>Все готово!</h2>
                                <p>Спасибо, <span class="shown_name"></span>! Ваша информация
                                  передана администрации The Hostels. Статус верификации обновится в ближайшее время.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
              )
}

              export default Form1