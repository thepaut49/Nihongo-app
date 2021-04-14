package com.thepaut49.nihongo.mapper;

import com.thepaut49.nihongo.dto.ObjectDTO;
import com.thepaut49.nihongo.model.counter.Counter;
import com.thepaut49.nihongo.model.iadjective.IAdjective;
import com.thepaut49.nihongo.model.kanji.Kanji;
import com.thepaut49.nihongo.model.naadjective.NaAdjective;
import com.thepaut49.nihongo.model.name.Name;
import com.thepaut49.nihongo.model.verb.Verb;
import com.thepaut49.nihongo.model.word.Word;

public class ObjectDTOMapper {
	
	public static ObjectDTO map(Object object) {
		if (object instanceof Kanji) {
			Kanji kanji = (Kanji) object;
			return new ObjectDTO(kanji.getId(), kanji.getKanji().toString());
		}
		else if (object instanceof Verb) {
			Verb verb = (Verb) object;
			return new ObjectDTO(verb.getId(), verb.getNeutralForm());
		}
		else if (object instanceof NaAdjective) {
			NaAdjective naAdjective = (NaAdjective) object;
			return new ObjectDTO(naAdjective.getId(), naAdjective.getKanjis());
		}
		else if (object instanceof IAdjective) {
			IAdjective iAdjective = (IAdjective) object;
			return new ObjectDTO(iAdjective.getId(), iAdjective.getKanjis());
		}
		else if (object instanceof Name) {
			Name name = (Name) object;
			return new ObjectDTO(name.getId(), name.getKanjis());
		}
		else if (object instanceof Word) {
			Word word = (Word) object;
			return new ObjectDTO(word.getId(), word.getKanjis());
		}
		else if (object instanceof Counter) {
			Counter counter = (Counter) object;
			return new ObjectDTO(counter.getId(), counter.getKanjis());
					
		}
		else {
			return null;
		}
	}
}
