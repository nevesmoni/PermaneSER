import React, { FormEvent, useState } from "react";
import type { Page } from "../App";

interface ContatoProps {
  navigate: (page: Page) => void;
}

function Contato({ navigate }: ContatoProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Impede o envio nativo do navegador: antes, a tela de sucesso
    // trocava o formulário na hora e o envio nunca chegava a acontecer.
    event.preventDefault();
    
