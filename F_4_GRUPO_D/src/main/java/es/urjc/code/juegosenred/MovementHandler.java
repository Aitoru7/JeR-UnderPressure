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

public class MovementHandler extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private List<WebSocketSession> jugadores = new ArrayList<WebSocketSession>();
	AtomicInteger nextId = new AtomicInteger(0);
	
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
		if(text.equals("izquierda")){
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("name", "izquierda");
			newNode.put("diferenciador", "movimiento");
			newNode.put("finalx", node.get("datox").asInt());
			newNode.put("finaly", node.get("datoy").asInt());
			
			for(WebSocketSession participant : sessions.values()) {
				if(!participant.getId().equals(session.getId())) {
					synchronized(session) {
						participant.sendMessage(new TextMessage(newNode.toString()));
					}
				}
			}	
		}else if(text.equals("derecha")) {
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("name", "derecha");
			newNode.put("diferenciador", "movimiento");
			newNode.put("finalx", node.get("datox").asInt());
			newNode.put("finaly", node.get("datoy").asInt());
			
			for(WebSocketSession participant : sessions.values()) {
				if(!participant.getId().equals(session.getId())) {
					synchronized(session) {
						participant.sendMessage(new TextMessage(newNode.toString()));
					}
				}
			}
		}else if(text.equals("arriba")) {
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("name", "arriba");
			newNode.put("diferenciador", "movimiento");
			newNode.put("finalx", node.get("datox").asInt());
			newNode.put("finaly", node.get("datoy").asInt());
			
			for(WebSocketSession participant : sessions.values()) {
				if(!participant.getId().equals(session.getId())) {
					synchronized(session) {
						participant.sendMessage(new TextMessage(newNode.toString()));
					}
				}
			}
		}else if(text.equals("parado")) {
			ObjectNode newNode = mapper.createObjectNode();
			newNode.put("name", "parado");
			newNode.put("diferenciador", "movimiento");
			newNode.put("finalx", node.get("datox").asInt());
			newNode.put("finaly", node.get("datoy").asInt());
			
			for(WebSocketSession participant : sessions.values()) {
				if(!participant.getId().equals(session.getId())) {
					synchronized(session) {
						participant.sendMessage(new TextMessage(newNode.toString()));
					}
				}
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