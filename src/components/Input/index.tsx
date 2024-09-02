'use client'

import styled from "styled-components"

export const Input = styled.input`
    padding: 8px 16px;
    border-radius: 4px;
    background: rgba(245, 246, 243, 0.70);
    backdrop-filter: blur(50px);
    border: none;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;
    letter-spacing: -0.18px;
    flex-grow: 1;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
    }
`