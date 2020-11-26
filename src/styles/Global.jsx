import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --header-background: ${({ theme }) => theme.header.background};
    --header-text: ${({ theme }) => theme.header.text};
    --footer-background: ${({ theme }) => theme.footer.background};
    --footer-text: ${({ theme }) => theme.footer.text};
    --links-primary: ${({ theme }) => theme.links.primary};
    --links-secondary: ${({ theme }) => theme.links.secondary};
    --button-primary-background: ${({ theme }) => theme.buttons.primary.background};
    --button-primary-text: ${({ theme }) => theme.buttons.primary.text};
    --button-secondary-background: ${({ theme }) => theme.buttons.secondary.background};
    --button-secondary-text: ${({ theme }) => theme.buttons.secondary.text};
    --color-white: #fff;
    --color-gray-light-1: #d7d7d7;
    --color-gray-light: #efefef;
    --color-gray-light-1: #d7d7d7;
    --color-gray-light-2: #918f8f;
  }

  html,
  html body {
    background: ${({ theme }) => theme.background};
  }

  .fixed-top {
    z-index: 998;
  }

  ul {
    list-style: none !important;
    padding-left: 0;
  }

  .pagination {
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .pagination li {
    margin: 25px 10px 0 10px;
  }

  .pagination li a {
    color: #022751;
    padding: 7px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .pagination li a:hover {
    background: #e0dede;
  }

  .pagination .active a,
  .pagination .active a:hover {
    color: #fff;
    font-weight: bold;
    background: var(--button-primary-background);
  }

  .breadcrumb {
    font-size: 0.8rem;
    background-color: transparent !important;/*#e9ecef*/
  }

  .breadcrumb:not(:last-child) {
    margin-bottom: 1.3rem;

    @media (max-width: 768px) {
      margin-bottom: 0.6rem;
    }
  }

  .breadcrumb a,
  .breadcrumb a:hover {
    color: #6c757d;
  }

  .breadcrumb li.is-active a {
    color: #eee;
  }

  .breadcrumb-item + .breadcrumb-item {
    padding-left: 0;
  }

  .is-mb-paddingless {
    padding-bottom: 0 !important;
  }

  .scrollAreaOrder {
    overflow: auto;
    max-height: 65vh;
    padding-right: 1.2rem;

    @media (max-width: 768px) {
      margin-right: 1.2rem;
      padding-right: 0.5rem;
    }
  }

  .quill > .ql-toolbar {
    display: none;
  }

  .quill > .ql-container {
    border: 0;
  }

  .ql-editor {
    padding: 0 15px 12px 0 !important;
  }

  .ql-editor > * {
    cursor: default;
  }


  .spin-loader-container{
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .spin-loader{
  animation: rotate 1s linear infinite;
  margin: 40px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #999;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
}
`;

export default GlobalStyles;
