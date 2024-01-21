import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  DeliveryRow,
  HeaderMenu,
  ProfilePicture,
  SearchInput,
  SearchWrapper,
  MobileMenu,
} from "./styles";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import { consultAuth, consultCEP } from "../../services/api";
import mobile_logo from "../../assets/simple_logo.png";
import Dropdown from "../Dropdown";
import { Rotate as Hamburger } from "hamburger-react";
import {
  FaShoppingBag,
  FaUser,
  FaSignOutAlt,
  MdLocationOn,
  MdChatBubble,
  IoTicket,
  RiCoupon2Fill,
  LuSearch,
  IoMdClose,
} from "../../styles/Icons";

function Header() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchParameter, setSearchParameter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);

  if (typeof window !== "undefined") {
    function setHeaderFixed() {
      if (window.scrollY >= 1) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    }

    window.addEventListener("scroll", setHeaderFixed);
  }

  const options = [
    { name: "Ver Conta", icon: <FaUser />, action: "redirect", url: "account" },
    {
      name: "Chats",
      icon: <MdChatBubble />,
      action: "redirect",
      url: "account",
    },
    { name: "Pedidos", icon: <IoTicket />, action: "redirect", url: "account" },
    {
      name: "Cupoms",
      icon: <RiCoupon2Fill />,
      action: "redirect",
      url: "account",
    },
    {
      name: "Meu Carrinho",
      icon: <FaShoppingBag />,
      action: "redirect",
      url: "cart",
    },
    { name: "Sair", icon: <FaSignOutAlt />, action: "logout" },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await consultAuth();

        setLogged(!logged);
        setUserData(response);
      } catch (err) {
        console.log(err);
      }
    };

    checkAuthentication();
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAction = (item) => {
    switch (item.action) {
      case "redirect":
        navigate(item.url);
        setIsOpen(false);
        break;
      case "logout":
        localStorage.removeItem("access_token");
        localStorage.clear();
        window.location.reload();
        navigate("/");
        break;
      default:
        setIsOpen(false);
        console.warn("Ação desconhecida:", item.action);
    }
  };

  const handleSearch = () => {
    if (searchParameter !== "") {
      navigate(`/search?term=${searchParameter}`);
    } else {
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(`/search?term=${searchParameter}`);
      setSearchParameter("");
    }
  };

  return (
    <>
      <Container searchOpen={searchOpen} isFixed={isFixed}>
        <div className="mobile-header-wrapper">
          <img
            src={windowWidth >= 900 ? logo : mobile_logo}
            onClick={() => navigate("/")}
          />

          <div className="mobile-right-side">
            {logged && (
              <LuSearch
                className="mobile-search-icon"
                size={25}
                onClick={() => setSearchOpen(!searchOpen)}
              />
            )}

            <div className="mobile-hamburger">
              <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
          </div>
        </div>

        <div className="search-full-bar">
          <SearchWrapper className="search-bar" isFixed={isFixed}>
            <LuSearch onClick={() => handleSearch()} size={25} />
            <SearchInput
              onChange={(e) => setSearchParameter(e.target.value)}
              value={searchParameter}
              onKeyDown={handleKeyDown}
              placeholder="Procure por pratos e restaurantes.."
            />
          </SearchWrapper>
          <IoMdClose size={30} onClick={() => setSearchOpen(!searchOpen)} />
        </div>

        <HeaderMenu>
          {logged ? (
            <>
              <SearchWrapper isFixed={isFixed}>
                <LuSearch onClick={() => handleSearch()} size={25} />
                <SearchInput
                  onChange={(e) => setSearchParameter(e.target.value)}
                  value={searchParameter}
                  onKeyDown={handleKeyDown}
                  placeholder="Procure por pratos e restaurantes.."
                />
              </SearchWrapper>
              <DeliveryRow isFixed={isFixed}>
                <sub>Entregar para</sub>
                <span>
                  <MdLocationOn size={15} />
                </span>{" "}
                <h4>
                  {`${userData.street || "Inclua um endereço à sua conta"} ${
                    userData.number || ""
                  }`}
                </h4>
              </DeliveryRow>
              <li className="cart-btn">
                <FaShoppingBag size={15} />
              </li>

              <ProfilePicture
                ref={dropdownRef}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                picture={`${process.env.REACT_APP_SERVER_URL}/files/${userData.picture}`}
              >
                <Dropdown
                  name={userData.name}
                  show={isDropdownOpen}
                  items={options}
                />
              </ProfilePicture>
            </>
          ) : (
            <>
              <li>Sobre Nós</li>
              <li>Fale Conosco</li>
              <li
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                Criar Conta
              </li>
              <li className="login-btn" onClick={() => navigate("/login")}>
                Entrar
              </li>
            </>
          )}
        </HeaderMenu>
      </Container>
      {isOpen && (
        <MobileMenu>
          {logged ? (
            <>
              <h1>Olá {userData?.name} 👋</h1>
              <ul>
                {options.map((option, index) => {
                  return (
                    <li key={index} onClick={() => handleAction(option)}>
                      {option.icon}
                      {option.name}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <ul>
              {" "}
              <li>Sobre Nós</li>
              <li>Fale Conosco</li>
              <li
                className="register-btn"
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
              >
                Criar Conta
              </li>
              <li
                className="login-btn"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Entrar
              </li>{" "}
            </ul>
          )}
        </MobileMenu>
      )}
    </>
  );
}

export default Header;
