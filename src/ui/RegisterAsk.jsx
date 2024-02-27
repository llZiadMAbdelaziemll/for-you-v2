// import React from 'react'

// const RegitserShapeContainer = styled.div`
//   width: 410px;
//   margin: auto;
//   margin-top: 10px;
// `;

// const RegitserShape = styled.div`
//   width: 100%;
//   padding: 15px;
//   background-color: var(--color-grey-50);
//   text-align: center;
// `;

// const RegShapeUnderline = styled.div`
//   position: relative;
//   text-align: center;
//   margin-top: 20px;
//   &:before,
//   &:after {
//     content: "";
//     position: absolute;
//     top: -5px;
//     width: 40%;
//     border-bottom: solid 1px white;
//   }
//   &:before {
//     left: 0;
//   }

//   &:after {
//     right: 0%;
//   }
// `;

// const Or = styled.span`
//   position: absolute;
//   top: -15px;
//   left: 47%;
// `;

// const Already = styled.div`
//   padding-top: 8px;
//   font-size: 16px;
// `;

// const Link = styled.a`
//   color: blue;
//   padding-left: 5px;
//   cursor: pointer;
//   &:hover {
//     color: darkblue;
//   }
// `;
// export const RegisterAsk = () => {
//   const navigate = useNavigate();

//   function handleHaveAcc(e) {
//     e.preventDefault();
//     navigate("/login");
//   }

//   return (
//     <RegitserShapeContainer>
//         <RegitserShape>Register</RegitserShape>
//         <RegShapeUnderline class="or-divider">
//           <Or>OR</Or>
//         </RegShapeUnderline>
//       </RegitserShapeContainer>
//       <Already>
//         already registered ? <Link onClick={handleHaveAcc}>log in</Link>
//       </Already>
//   )
// }
