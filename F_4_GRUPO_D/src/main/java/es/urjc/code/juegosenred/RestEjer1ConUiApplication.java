package es.urjc.code.juegosenred;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class RestEjer1ConUiApplication implements WebSocketConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(RestEjer1ConUiApplication.class, args);
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createSceneHandler(), "/partida");
		
		registry.addHandler(createMovementHandler(), "/movimiento");
		
		registry.addHandler(createNumbersHandler(), "/numeros");
		
		registry.addHandler(createMissionsHandler(), "/misiones");
	}
	
	@Bean
	public SceneHandler createSceneHandler() {
		return new SceneHandler();
	}
	
	@Bean
	public MovementHandler createMovementHandler() {
		return new MovementHandler();
	}
	
	@Bean
	public NumbersHandler createNumbersHandler() {
		return new NumbersHandler();
	}
	
	@Bean
	public MissionsHandler createMissionsHandler() {
		return new MissionsHandler();
	}
	
}
