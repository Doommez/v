<template>
  <v-card class="card">
    <v-card-title class="card__title">
      <slot name="title" />
    </v-card-title>
    <v-card-subtitle class="card__subtitle">
      <slot name="subtitle" />
    </v-card-subtitle>
    <v-card-text class="card__content">
      <slot />
    </v-card-text>
    <v-card-actions class="card__actions actions">
      <slot name="footer">
        <button
          class="actions__edit button"
          :class="{button_shown: isCardEditable}"
          @click="editCard"
        >
          <v-icon
            class="button__icon button__icon_editable"
            icon="mdi-pencil"
          />
        </button>
        <button
          class="actions__delete button"
          :class="{button_shown: isCardDeletable}"
          @click="deleteCard"
        >
          <v-icon
            class="button__icon button__icon_deletable"
            icon="mdi-delete"
          />
        </button>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  const props = defineProps({
    isCardEditable: {
      type: Boolean,
      default: true,
    },
    isCardDeletable: {
      type: Boolean,
      default: true,
    },
  });

  const emits = defineEmits([
    'editCard', 'deleteCard',
  ]);

  const deleteCard = () => {
    emits('deleteCard');
  };

  const editCard = () => {
    emits('editCard');
  };
</script>

<style lang="scss" scoped>
  @use "../styles/utils/variables";
  @use "../styles/utils/mixins" as mixsins;

  .card {
    max-width: 350px;
    border: none;
    outline: none;
    display: grid;
    align-items: center;

    &__title {
      @include mixsins.font-h2-bold;
      background-color: variables.$green-lite;
    }

    &__subtitle {
      @include mixsins.text-sm-bold
    }

    &__content {
      @include mixsins.text-lg-regular;
      text-align: start;
    }

    &__actions {
      display: flex;
      justify-content: end;
    }
  }

  .actions {
    &__edit {
      visibility: hidden;
      @include mixsins.text-md-semi-bold;
      color: variables.$yellow;
      margin-right: 10px;
    }

    &__delete {
      visibility: hidden;
      @include mixsins.text-md-semi-bold;
      color: variables.$red;
    }
  }

  .button {
    &__icon {
      @include mixsins.button-icon;

      &_editable {
        color: variables.$yellow;
      }

      &_deletable {
        color: variables.$red;
      }
    }
    &_shown {
      visibility: visible;
    }
  }
</style>
