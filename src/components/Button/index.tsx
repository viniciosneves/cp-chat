'use client'
import styled from "styled-components";

export const Button = styled.button`
    padding: 8px;
    border: none;
    border-radius: 4px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), #F5F6F3;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
    }
`