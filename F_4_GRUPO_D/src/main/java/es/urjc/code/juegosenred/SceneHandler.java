package es.urjc.code.juegosenred;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class SceneHandler extends TextWebSocketHandler {

	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private List<WebSocketSession> jugadores = new ArrayList<WebSocketSession>();
	//private List<List<WebSocketSession>> servidor = new ArrayList<>();
	AtomicInteger nextId = new AtomicInteger(0);
	Integer suma2 = 0;
	private Object mutex = new Object();
	Integer a = 0, b = 0;	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		int id = nextId.getAndIncrement();
		//System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		jugadores.add(id, session);
		//System.out.println(jugadores.get(id));
		//System.out.println(session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {				
		for(WebSocketSession participant : jugadores) {
			if(!participant.equals(session)) {
				participant.sendMessage(new TextMessage("Desconexion"));
			}
		}
		for(int i = 0; i < jugadores.size(); i++) {
			if(jugadores.get(i).equals(session)) {
				jugadores.remove(i);
				nextId.getAndDecrement();
			}
		}
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		//System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {
		//System.out.println("Message sent: " + node.toString());
		//System.out.println(node.get("name").asText());
		String text = node.get("name").asText();
		//System.out.println(text);
		if(text.equals("coordenadas")){
			/*for(WebSocketSession jugador : jugadores) {
				System.out.println(jugador);
			}*/	
			synchronized(mutex) {
				if(suma2 == 0) {
					do {
						suma2 += 1;
						a = (int)(Math.floor(Math.random() * 5));
						b = (int)(Math.floor(Math.random() * 5));						
					}while(a == b);		
				}else {
					suma2 = 0;
				}
			}
			ObjectNode newNode7 = mapper.createObjectNode();
			ObjectNode newNode8 = mapper.createObjectNode();
			newNode7.put("mias", 300);
			newNode7.put("suyas", 500);
			newNode7.put("a", a);
			newNode7.put("b", b);
			newNode7.put("diferenciador", "inicialmente");
			newNode8.put("mias", 500);
			newNode8.put("suyas", 300);
			newNode8.put("a", b);
			newNode8.put("b", a);
			newNode8.put("diferenciador", "inicialmente");

			//System.out.println(jugadores.get(0) + "jugador 0");
			//System.out.println(session + "yo");
			if(session.equals(jugadores.get(0))) {
				session.sendMessage(new TextMessage(newNode7.toString()));
			}else {
				session.sendMessage(new TextMessage(newNode8.toString()));
			}
		}else if(text.equals("arreglado")) {			
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("averia", node.get("dato").asInt());
			newNode.put("diferenciador", "arreglado");
			
			for(WebSocketSession participant : sessions.values()) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}else {
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("name", node.get("name").asText());
			
			for(WebSocketSession participant : sessions.values()) {
				if(!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
		}
	}
}
